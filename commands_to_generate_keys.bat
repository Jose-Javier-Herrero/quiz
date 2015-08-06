mkdir certs
cd certs
openssl genrsa -out quiz-jose-javier-herrero-key.pem 2048
openssl req -new -sha256 -key quiz-jose-javier-herrero-key.pem -out quiz-jose-javier-herrero-csr.pem
openssl x509 -req -in quiz-jose-javier-herrero-csr.pem -signkey quiz-jose-javier-herrero-key.pem -out quiz-jose-javier-herrero-cert.pem
cd ..