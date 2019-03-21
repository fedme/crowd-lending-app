import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;
  project: Project;
  amount: number;
  resultMessage: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log('page params', params);
      this.id = params.id; // (+) converts string 'id' to a number
      this.retrieveProject();
      this.resultMessage = '';
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private async retrieveProject() {
    console.log('retrieving project by id...', this.id);
    this.project = await this.api.getProjectById(this.id);
    console.log(this.project);
  }

  public async invest() {
    try {
      const res = await this.api.investInProject(this.id, this.amount);
      console.log('result of investing in project', res);
      this.resultMessage = `You have succesfully invested ${this.amount} in the project!`;
    } catch (error) {
      console.log('error when investing in project', error);
      this.resultMessage = error.error.Amount != null ? error.error.Amount : error.error.message;
    }

    this.retrieveProject();
  }

}
