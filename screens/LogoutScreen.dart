import 'package:flutter/material.dart';

class LogoutScreen extends StatelessWidget {
  final Function logout;
  final Function navigateToDashboard;

  LogoutScreen({required this.logout, required this.navigateToDashboard});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Are you sure you want to logout?',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () => logout(),
              style: ElevatedButton.styleFrom(
                primary: Colors.blue[700], // Replace with your desired color
                padding: EdgeInsets.all(15.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
              ),
              child: Text(
                'Logout',
                style: TextStyle(color: Colors.white),
              ),
            ),
            SizedBox(height: 10.0),
            ElevatedButton(
              onPressed: () => navigateToDashboard(),
              style: ElevatedButton.styleFrom(
                primary: Colors.grey[300], // Replace with your desired color
                padding: EdgeInsets.all(15.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
              ),
              child: Text(
                'Cancel',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
