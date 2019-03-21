import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor(private api: ApiService) {
    this.projects = [];
  }

  ngOnInit() {
    this.retrieveProjects();
  }

  private async retrieveProjects() {
    try {
      this.projects = await this.api.getAllProjects();
      console.log('projects', this.projects);
    } catch (error) {
      console.log(error);
    }
  }
}
