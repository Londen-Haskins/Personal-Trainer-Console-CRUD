# Personal-Trainer-Console-CRUD
A web application that serves as a client management tool for personal trainers. Built with an Apache server, Angular front-end, PHP back-end, and accepts data from a SQL database. This project is ongoing and will change as significant upgrades are made to functionality, and when AWS services are added.

![My Image](SamplePictures/fitnessCRUD.PNG)
![My Image](SamplePictures/fitnessCRUD2.PNG)

Database structure to run this app is:
"CREATE DATABASE pbfitness";

"CREATE TABLE `users` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(50),
  `subscription` varchar(50),
  `workoutId` int(5) NOT NULL,
  `dietId` int(5) NOT NULL,
  PRIMARY KEY (id)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8";

	$tbCreate2 = "CREATE TABLE `workouts` (
  `id` int(4) NOT NULL,
  `exercise` text,
  `weight` decimal(6,2),
  `workoutId` int(5) NOT NULL,
  `sets` int(3),
  `reps` int(3),
  `notes` text,
  PRIMARY KEY (nKey)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8";


The web app is currently hosted on AWS via a Linux t2.micro EC2 instance, and uses an AWS RDS SQL database to hold client data. All of which is contained in a virtual private cloud.

# Live Example
(Current live application is previous version. Currently updating AWS server to newer build)
A sample of the web app can be viewed at http://18.188.122.85/
Server architecture can be examined in the diagram PDF
