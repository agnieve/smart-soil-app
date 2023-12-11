
import 'package:flutter/material.dart';

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  bool toggle = false;

  void toggleAutomation() {
    setState(() {
      toggle = !toggle;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            StatusCard(
              color: Color(0xFF914C9E), // Replace with your desired color
              title: 'Soil Moisture',
              value: '34.7%',
            ),
            StatusCard(
              color: Color(0xFFF9A61C), // Replace with your desired color
              title: 'Temperature',
              value: '28%',
            ),
            StatusCard(
              color: Color(0xFF9ECC54), // Replace with your desired color
              title: 'Humidity',
              value: '35%',
            ),
            SizedBox(height: 10.0),
            Text(
              'Water Automation Status',
              style: TextStyle(fontSize: 18.0),
            ),
            ElevatedButton(
              onPressed: toggleAutomation,
              style: ElevatedButton.styleFrom(
                primary: toggle
                    ? Color(0xFFYourSecondaryColor) // Replace with your secondary color
                    : Color(0xFFYourPrimaryColor), // Replace with your primary color
                padding: EdgeInsets.all(15.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
              ),
              child: Text(
                toggle ? 'OFF' : 'ON',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class StatusCard extends StatelessWidget {
  final Color color;
  final String title;
  final String value;

  StatusCard({
    required this.color,
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(20.0),
      ),
      padding: EdgeInsets.all(20.0),
      margin: EdgeInsets.only(bottom: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              color: Colors.white,
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 10.0),
          Text(
            value,
            style: TextStyle(
              color: Colors.white,
              fontSize: 48.0,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
