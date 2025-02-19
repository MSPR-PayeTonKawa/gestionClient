pipeline {
    agent {
        kubernetes {
      label 'nodejs-docker-agent'
      yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: nodejs
                image: node:20
                command:
                - cat
                tty: true
              - name: docker
                image: docker:20.10.7
                command:
                - cat
                tty: true
                volumeMounts:
                - name: docker-sock
                  mountPath: /var/run/docker.sock
              - name: sonar-scanner
                image: sonarsource/sonar-scanner-cli:latest
                command:
                - cat
                tty: true
              volumes:
              - name: docker-sock
                hostPath:
                  path: /var/run/docker.sock
            '''
        }
    }
    environment {
        SONAR_HOST_URL = credentials('e53ab44a-35fb-41ae-80ab-dd6836a9463c') // SONAR_HOST
        SONAR_TOKEN = credentials('9c1c3109-58e4-4890-b88f-2615d2221245') // SONAR_TOKEN
        HARBOR_USERNAME = credentials('db2c5c66-275f-440f-a0d5-73dce0f7355e') // HARBOR_USERNAME
        HARBOR_PASSWORD = credentials('a6c7d1c9-3c1b-4bdb-a0c5-4ca28f51c1f5') // HARBOR_PASSWORD
    }
    stages {
        stage('SonarQube Analysis') {
          steps {
            container('sonar-scanner') {
              sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=MSPR-PayeTonKawa_gestionClient_0a201890-2ab0-4ce1-92f8-8a36a2abe9a5 \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=$SONAR_HOST_URL \
                          -Dsonar.login=$SONAR_TOKEN
                        '''
            }
          }
        }
        // stage('Install Dependencies') {
        //   steps {
        //     container('nodejs') {
        //       sh 'npm ci'
        //     }
        //   }
        // }
        // stage('Test') {
        //   steps {
        //     container('nodejs') {
        //       sh 'npm run test'
        //     }
        //   }
        // }
        stage('Build Docker Image') {
          steps {
            container('docker') {
              script {
                def imageName = 'registry.germainleignel.com/paye-ton-kawa/gestion-clients:latest'
                sh "docker build -t ${imageName} ."
              }
            }
          }
        }
        stage('Push Docker Image') {
          steps {
            container('docker') {
              script {
                def imageName = 'registry.germainleignel.com/paye-ton-kawa/gestion-clients:latest'
                sh 'echo $HARBOR_PASSWORD | docker login registry.germainleignel.com --username $HARBOR_USERNAME --password-stdin'
                sh "docker push ${imageName}"
              }
            }
          }
        }
        stage('Deploy') {
          steps {
            sshagent(credentials: ['6ff897ff-0cc3-4a47-86ca-a467266a6e4b']) {
              script {
                def sshCommand = 'ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null gmn@176.189.118.208 "/home/gmn/scripts/deploy.sh /home/gmn/apps/payetonkawa/gestionClient gestion-clients-deployment payetonkawa-prod"'
                def deployOutput = sh(script: sshCommand, returnStdout: true).trim()
                echo "Deployment output:\n${deployOutput}"
              }
            }
          }
        }
    }
    post {
        always {
      archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
        }
        success {
      echo 'Tests ran successfully and image was built and pushed.'
        }
        failure {
      echo 'Tests or Docker build/push failed.'
        }
    }
}
