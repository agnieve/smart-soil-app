import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/cupertino.dart';

class ChangeCraftScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Select Craft',
              style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20.0),
            Text(
              "Welcome to our mobile app, where you can unlock a world of customization with our 'Change Features' functionality, putting you in control like never before.",
              style: TextStyle(
                color: Colors.grey[500],
                fontSize: 16.0,
              ),
            ),
            SizedBox(height: 20.0),
            CraftOption('Fruit Craft'),
            CraftOption('Vegetable Craft'),
            CraftOption('Flower Craft'),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                // Add your logic to handle changing the craft here
              },
              style: ElevatedButton.styleFrom(
                primary: Colors.blue[700], // Replace with your desired color
                padding: EdgeInsets.all(15.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
              ),
              child: Text(
                'Change Craft',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CraftOption extends StatelessWidget {
  final String title;

  CraftOption(this.title);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.all(20.0),
          margin: EdgeInsets.only(bottom: 10.0),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.blue[700]!), // Replace with your desired color
            borderRadius: BorderRadius.circular(20.0),
          ),
          child: Row(
            children: [
              Icon(
                Icons.circle_outlined,
                size: 20.0,
                color: Colors.blue[700], // Replace with your desired color
              ),
              SizedBox(width: 10.0),
              Text(
                title,
                style: TextStyle(fontSize: 18.0),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
