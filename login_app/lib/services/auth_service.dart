import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  AuthService();

  // Methode de login
  Future<Map<String, dynamic>?> login(String email, String password) async {
    // Appel vers l'API pour se connecter
    final response = await http.post(
      Uri.parse('http://10.0.2.2:3000/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    // Si response est 200, on retourne les données de l'utilisateur
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return {
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'role': data['role'],
      };
    } else {
      return null;
    }
  }
}
