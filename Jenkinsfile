pipeline {
    agent {
        docker {
            label 'docker'
            image 'node:10'
        }
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
                sh 'yarn add --dev firebase-tools'
                sh 'yarn install'
                sh 'firebase deploy'
            }
        }
    }
}
