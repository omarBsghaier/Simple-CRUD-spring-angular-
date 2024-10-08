import {Component, OnInit, } from '@angular/core';
import {Observable} from "rxjs";
import {Tutorial} from "../../models/tutorial.model";
import {TutorialService} from "../../service/tutorial.service";
import {Page} from "../../models/page";

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.sass']
})
export class TutorialsComponent implements OnInit {
  tutorials : Tutorial[] = [];
  title: string = "";
  selectedTutorial: Tutorial | undefined ;
  showCreateTutorialForm: Boolean = false;
  isEdit = false ;

  currentPage: number = 0;
  pageSize: number = 5 ;
  totalPages! : number  ;
  pages: number[] = [];


  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.loadTutorials();
  }

  searchTutorials( ) {
    
       this.tutorials = this.tutorials.filter( tuto => tuto.title.includes(this.title)) ;
  }


  loadTutorials() {
    this.tutorialService.getAllTutorials(this.currentPage, this.pageSize).subscribe((response: Page)=>{
      this.tutorials = response.content;
      this.totalPages = response.totalPages ;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i );
      console.log(this.tutorials) ;
    }),
      ( (error: any) => {
        console.error('Error loading tutorials:', error);
      }
    );
  }


  deleteTutorial(id: number): void {
    if (confirm('Are you sure you want to delete this tutorial?')) {
      this.tutorialService.deleteTutorial(id).subscribe({
        next: () => {
          console.log('Tutorial deleted successfully.');
          this.tutorials = this.tutorials.filter(tutorial => tutorial.id !== id);
          this.loadTutorials();
        },
        error: (error: any) => {
          console.error('Error deleting tutorial:', error);
        }
      });
    }
  }

  removeAllTutorials(): void {
    if (confirm('Are you sure you want to delete all tutorials?')) {
      this.tutorialService.deleteAllTutorial().subscribe({
        next: () => {
          console.log('All tutorials deleted successfully.');
          this.tutorials = [] ;
          this.loadTutorials();
        },
        error: (error: any) => {
          console.error('Error deleting all tutorials:', error);
        }
      });
    }
  }

  editTutorial (tutorial : Tutorial): void {
    this.showCreateTutorialForm = true;
    this.isEdit = true ;
    this.selectedTutorial = tutorial;

  }

  addTutorial() {
    this.showCreateTutorialForm = true;
    this.isEdit = false ;
    this.selectedTutorial = undefined ;
  }

  closeModal(): void {
    this.showCreateTutorialForm = false;
  }

  trackByFn(index: number, item: Tutorial): number {
    return item.id;
  }


  CreateOrUpdateTutorial(tutorial: Tutorial) {
    if (!this.selectedTutorial) {
      this.tutorialService.createTutorial(tutorial)
        .subscribe({
          next: (response: Tutorial) => {
            this.loadTutorials();
          },
          error: (error: any) => {
            console.error('Error creating tutorial:', error);
          }
        });
    } else {
        this.tutorialService.updateTutorial(this.selectedTutorial.id, tutorial).subscribe({
          next: (response: Tutorial) => {
            console.log(response);
            this.selectedTutorial = undefined ;
            this.loadTutorials();
          },
          error: (error: any) => {
            console.error('Error updating tutorial:', error);
          }
        });
      }
    }

//////////////////////////////////////////////////////////////////
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTutorials();

    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadTutorials();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadTutorials();
  }
}
