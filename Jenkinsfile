pipeline {
    agent {
        docker {
            label 'docker'
            image 'node:10'
        }
    }
    environment {
        FIREBASE_DEPLOY_KEY = credentials('firebase_token_web')
    }
    stages {
        stage('Install') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'yarn global add firebase-tools'
                sh "firebase deploy --token ${FIREBASE_DEPLOY_KEY}"
            }
        }
    }
}
