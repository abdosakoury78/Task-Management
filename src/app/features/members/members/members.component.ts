import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../../../shared/models/member';

@Component({
  selector: 'app-members',
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit{
  private memberService = inject(MembersService);
  members : Member[] = [];

  ngOnInit(): void {
    this.memberService.getMembers().subscribe({
      next: (result) => {
        this.members = result;
        console.log(this.members);
      }
    })
  }

  getTaskCount(member: Member, status: string): number {
    return member.tasks.filter(task => task.status === status).length;
  }
}
