case $1 in 

mongo)
  scp -i SDC.pem ./init.sh ec2-user@ec2-18-191-198-213.us-east-2.compute.amazonaws.com:~/init.sh
  ssh -i SDC.pem ec2-user@ec2-18-191-198-213.us-east-2.compute.amazonaws.com
  ;;
node)
  scp -i SDC.pem ./init.sh ec2-user@ec2-3-144-34-9.us-east-2.compute.amazonaws.com:~/init.sh
  ssh -i SDC.pem ec2-user@ec2-3-144-34-9.us-east-2.compute.amazonaws.com
  ;;
esac