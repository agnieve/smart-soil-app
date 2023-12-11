import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

class TagCraftScreen extends StatefulWidget {
  @override
  _TagCraftScreenState createState() => _TagCraftScreenState();
}

class _TagCraftScreenState extends State<TagCraftScreen> {
  GoogleMapController? _controller;
  LocationData? _locationData;
  String _errorMsg = '';

  @override
  void initState() {
    super.initState();
    _getLocation();
  }

  void _getLocation() async {
    Location location = Location();
    bool serviceEnabled;
    PermissionStatus permissionStatus;

    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        setState(() {
          _errorMsg = 'Location services are disabled.';
        });
        return;
      }
    }

    permissionStatus = await location.hasPermission();
    if (permissionStatus == PermissionStatus.denied) {
      permissionStatus = await location.requestPermission();
      if (permissionStatus != PermissionStatus.granted) {
        setState(() {
          _errorMsg = 'Location permission denied.';
        });
        return;
      }
    }

    LocationData locationData = await location.getLocation();
    setState(() {
      _locationData = locationData;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_errorMsg.isNotEmpty) {
      return Center(
        child: Text(_errorMsg),
      );
    }

    return Scaffold(
      body: GoogleMap(
        onMapCreated: (controller) {
          setState(() {
            _controller = controller;
          });
        },
        initialCameraPosition: CameraPosition(
          target: LatLng(6.740850, 125.359680),
          zoom: 15.0,
        ),
        markers: Set<Marker>.from([
          Marker(
            markerId: MarkerId("CurrentLocation"),
            position: LatLng(_locationData?.latitude ?? 0, _locationData?.longitude ?? 0),
            icon: BitmapDescriptor.defaultMarker,
          ),
        ]),
      ),
    );
  }
}
