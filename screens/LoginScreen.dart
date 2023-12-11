import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/cupertino.dart';
import 'package:your_app/components/input.dart'; // Replace with the actual path to your Input component
import 'package:your_app/zustand_store/auth.dart'; // Replace with the actual path to your Zustand store

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void loginHandler() {
    final email = emailController.text;
    final password = passwordController.text;

    // Call your login function with email and password
    login(email, password);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFYourPrimaryColor), // Replace with your primary color
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/logo.png', // Replace with the actual path to your logo image
              width: 88, // Replace with your desired width
              height: 88, // Replace with your desired height
              margin: EdgeInsets.only(bottom: 16.0),
            ),
            Input(
              backgroundColor: Colors.white,
              placeholder: 'Enter your email',
              controller: emailController,
            ),
            Input(
              backgroundColor: Colors.white,
              placeholder: 'Enter your password',
              isPassword: true,
              controller: passwordController,
            ),
            ElevatedButton(
              onPressed: loginHandler,
              style: ElevatedButton.styleFrom(
                primary: Color(0xFFYourSecondaryColor), // Replace with your secondary color
              ),
              child: Text(
                'Login',
                style: TextStyle(color: Colors.white),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Not yet a member? "),
                TextButton(
                  onPressed: () {
                    // Add navigation to your signup screen here
                  },
                  child: Text(
                    'Signup',
                    style: TextStyle(
                      color: Color(0xFFYourSecondaryColor), // Replace with your secondary color
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
