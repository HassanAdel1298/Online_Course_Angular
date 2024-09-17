import { Component, NgModule } from '@angular/core';
import { CommonModule ,NgForOf } from '@angular/common';
//import { VideoService } from '../../../Service/video.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from '../../Service/session.service';
import { GroupService } from '../../Service/group.service';
//import {  Video } from './session.model';

@Component({
  selector: 'app-showsessions',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule , RouterLink,RouterModule],
  providers:[],
  
  templateUrl: './showsessions.component.html',
  styleUrl: './showsessions.component.css'
})
export class ShowsessionsComponent {
  
  // session: any = { sessionName: '', start_Date: '', end_at: '', rate: 0, OnlineVideo: '', instructor_ID: 0, group_ID: 0 };

  // constructor(private sessionService: VideoService) { }

  // upload() {
  //   this.sessionService.uploadSession(this.session).subscribe(() => {
  //     console.log('successfully');
  
  //     this.session = { sessionName: '', start_Date: '', end_at: '', rate: 0, OnlineVideo: '', instructor_ID: 0, group_ID: 0 };
  //   }, error => {
  //     console.error('Error uploading session:', error);
  //   });
  // }
  ////////////////
  // sessions: Session[] = [];
  // selectedSession: Session | null = null;


  //video: Video = { id: 0, title: '', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' };  ;
  
  sessions: any; 
  selectedSession: any; 
  groupId:any;
  sessionId:any;
  session:any ;
  group : any;
  
  constructor(private SessionService: SessionService , private GroupService: GroupService
    , private route: ActivatedRoute) { 
    this.groupId = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.loadSessions();

    this.GroupService.getGroupByID(this.groupId).subscribe((data) => {
      this.group = data;
    });
    
  }

  loadSessions() {
    
    this.SessionService.getSessionByGroupID(this.groupId).subscribe((data) => {
      //this.sessions=[];
      this.sessions= data;
      //this.getSessionById(this.sessions.session_ID);
    });
  }

  selectSession(session: any) {
    this.getSessionById(session.session_ID);
    this.selectedSession = session;
    
  }
  getSessionById(sessionId: number) {
   
    this.SessionService.getSessionByID(sessionId).subscribe((data) => {
      this.session = data;
    });
  }
  openZoom(zoomLink: string) {
    window.open(zoomLink, '_blank');
  }


  // loadVideo(): void {
  //   this.SessionService.getSessionByID(this.videoId)
  //     .subscribe(Session => {
  //       this.Session = Session;
  //     });
  // }



  // addVideo(): void {
  //   //const newVideo: Video = { id: 0, title: 'New Video', url: 'video_url.mp4' }; 
  //   // this.videoService.addVideo(newVideo)
  //   //   .subscribe(video => {
  //   //     this.video = video;
  //   //   });
  // }


 


}
