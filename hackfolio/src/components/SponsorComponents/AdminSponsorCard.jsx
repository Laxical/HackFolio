import React from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminSponsorDetail = ({ sponsor, onClose, onUpdate }) => {
  const handleVerify = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors/admin/verify/${sponsor.companyName}`, {
        verificationStatus: 'Verified',
      });
      
      onUpdate(); // Call onUpdate to refresh the sponsor list
      onClose(); // Close the detail view
    } catch (error) {
      console.error('Error verifying sponsor:', error);
      alert('Failed to verify sponsor');
    }
  };

  const handleDecline = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors/admin/decline/${sponsor.companyName}`, {
        verificationStatus: 'Rejected',
      });
      onUpdate(); // Call onUpdate to refresh the sponsor list
      onClose(); // Close the detail view
    } catch (error) {
      console.error('Error declining sponsor:', error);
      alert('Failed to decline sponsor');
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sponsor.companyName}</DialogTitle>
        </DialogHeader>
        <Card className="w-full max-w-lg mx-auto">
          <CardContent>
            <p><strong>Email:</strong> {sponsor.email}</p>
            <p><strong>Phone:</strong> {sponsor.phoneNumber}</p>
            <p><strong>Website:</strong> <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-[#5f3abd]">{sponsor.website}</a></p>
            <p><strong>Registration Number:</strong> {sponsor.registrationNumber}</p>
            <p><strong>Tax ID:</strong> {sponsor.taxId}</p>
            <p><strong>Address:</strong> {`${sponsor.address.street}, ${sponsor.address.city}, ${sponsor.address.state}, ${sponsor.address.zip}, ${sponsor.address.country}`}</p>
            <p><strong>Description:</strong> {sponsor.description}</p>
            <p><strong>Status:</strong> {sponsor.verificationStatus}</p>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button onClick={handleVerify} variant="success">
            Verify
          </Button>
          <Button onClick={handleDecline} variant="destructive">
            Decline
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminSponsorDetail;
