import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userForm !: FormGroup;
  userObject: User = new User();
  userList: any = [];

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.fetchUserData();
  }

  //Purpose:For adding user details
  addUserData() {
    this.userObject.name = this.userForm.value.name;
    this.userObject.email = this.userForm.value.email;

    console.log(this.userForm);
    this.userService.addUserData(this.userObject).subscribe((res) => {
      this.fetchUserData();
      console.log("Add User Data:", res);
    });
  }

  //Purpose:Clearing the form data for adding user
  clearData() {
    this.userForm.reset();
  }

  //Purpose:For fetching user details
  fetchUserData() {
    this.userService.fetchUserData().subscribe((res: any) => {
      this.userList = Object.values(res);
      console.log("Fetch User Data:", res);
    });
  }

  //Purpose:For deleting user details by id
  deleteUserData(id: any) {
    this.userService.deleteUserData(id).subscribe((res) => {
      this.fetchUserData();
      console.log("Delete User Data:", res);
    });
  }

  //Purpose:For edding user details
  editUserData(user: User) {
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }

  //Purpose:For updating user details
  updateUserData() {
    this.userObject.id = this.userForm.value.id;
    this.userObject.name = this.userForm.value.name;
    this.userObject.email = this.userForm.value.email;

    this.userService.updateUserData(this.userObject.id, this.userObject).subscribe((res) => {
      this.fetchUserData();
      console.log('Update Data', res);
    })
  }
}
