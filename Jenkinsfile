node('nextstep-compil') {
  stage('Prepare') {
    repositoryURL = "https://review.tech-advantage.com/a/nextstep"
	product="Next Step"
    notifier="cochin@techad.fr, chazalviel@techad.fr, lehman@techad.fr"

    branch = "master"
    isGerrit = false
    if (env.GERRIT_BRANCH) {
        branch = env.GERRIT_BRANCH
        isGerrit = true
    } else if (env.BRANCH_NAME) {
        branch = env.BRANCH_NAME
    }

    isReview = false
    if (env.GERRIT_EVENT_TYPE?.endsWith("created")) {
        isReview = true
    }

    currentBuild.description = isReview ? "review-" : "build-"
    currentBuild.description += branch
    currentBuild.description += isReview ? "-${GERRIT_CHANGE_NUMBER}" : ""

    println("branch: " + branch)
    println("isReview: " + isReview)
    println("isGerrit: " + isGerrit)
  }

  stage('Checkout') {
    if (isGerrit) {
        checkout([$class: 'GitSCM', branches: [[name: "*/${GERRIT_BRANCH}"]], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'BuildChooserSetting', buildChooser: [$class: 'GerritTriggerBuildChooser']], [$class: 'LocalBranch', localBranch: "change-${GERRIT_CHANGE_NUMBER}-${GERRIT_PATCHSET_NUMBER}"]], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '3053959a-4a04-4cb7-b867-a1dafea463ed', refspec: "${GERRIT_REFSPEC}", url: "${repositoryURL}"]]])
    } else {
        git branch: "${branch}",credentialsId: '3053959a-4a04-4cb7-b867-a1dafea463ed', url: "${repositoryURL}"
    }
  }
  
  stage('Build') {
    nodejs('NodeJS Latest') {
        sh label: 'Install Dependencies', returnStdout: true, script: 'npm i'
        sh label: 'Build library', returnStdout: true, script: 'npm run-script build'
    }
  }
  
  stage('Tests') {
    nodejs('NodeJS Latest') {
        sh label: 'Unit Tests', returnStdout: true, script: 'npm run-script test'
    }
  }

  stage('Archive artifact')  {
    archiveArtifacts artifacts: 'dist/**', excludes: null, onlyIfSuccessful: true
  }

  stage('Notification') {
    if (!isGerrit) {
      mail body: 'Build SUCCESS', from: 'noreply+jenkins@tech-advantage.com', subject: "[JENKINS][${product}][${branch}] Build SUCCESS", to: "${notifier}"
    }
  }
}
