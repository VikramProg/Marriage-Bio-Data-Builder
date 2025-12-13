pipeline {
    agent any
    
    tools {
        nodejs 'node' 
    }
    
    stages {
        stage('Install') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }
    }
    
    post {
        success {
            archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
        }
    }
}
