import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ClientSettingsPage = () => {
  return (
    <div className="w-full py-10 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User Avatar" />
            <AvatarFallback>UP</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your profile and settings</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="delete">Delete Account</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                </div>
                <Button type="submit" className="mt-2">Update Profile</Button>
              </form>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Current password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="New password" />
                </div>
                <Button type="submit" className="mt-2">Update Password</Button>
              </form>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>SMS Notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Push Notifications</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            {/* Delete Account Tab */}
            <TabsContent value="delete">
              <div className="space-y-4">
                <p className="text-destructive">
                  Deleting your account is irreversible. All your data will be lost.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSettingsPage;