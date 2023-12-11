import 'package:flutter_riverpod/flutter_riverpod.dart';

class User {
  String? user;

  User(this.user);
}

final userStoreProvider = Provider<UserStore>((ref) {
  return UserStore();
});

class UserStore {
  User? _user;

  User? get user => _user;

  void login(String userData) {
    _user = User(userData);
  }

  void logout() {
    _user = null;
  }
}
