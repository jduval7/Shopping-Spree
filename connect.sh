case $1 in 

mongo)
  scp -i SDC.pem ./init.sh ec2-user@ec2-18.216.175.94.us-east-2.compute.amazonaws.com:~/init.sh
  ssh -i SDC.pem ec2-user@ec2-18.216.175.94.us-east-2.compute.amazonaws.com
  ;;
node)
  scp -i SDC.pem ./init.sh ec2-user@ec2-18.220.38.230.us-east-2.compute.amazonaws.com:~/init.sh
  ssh -i SDC.pem ec2-user@ec2-18.220.38.230.us-east-2.compute.amazonaws.com
  ;;
esac