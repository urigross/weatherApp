import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CityPost } from 'src/app/models/cityPost.model';

@Component({
  selector: 'app-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.scss']
})
export class AutocompleteFilterComponent implements OnInit {
  searchString: string = '';
  @Input() citiesNames: string[] = [];
  // cities: string[] =[];
  stateForm!: FormGroup;
  faSearch = faSearch;
  showDropdown: boolean = false;
  

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.initForm();
   }

  ngOnInit(): void {
    // this.citiesPost.forEach(element => {
    //   this.cities.push(element.LocalizedName)});
  }

  initForm(): FormGroup{
      return this.stateForm = this.fb.group({
        search:[null]
      })
  }
  onToggleDropDown():void{
    this.showDropdown=!this.showDropdown;

  }

  getSearchValue(){
    console.log(this.stateForm.value.search,'search value')
    return this.stateForm.value.search;
  }
  onSelectValue(city:string):void{
    this.stateForm.patchValue({"search":city});
    this.showDropdown = false;
    //const cityIdx:number = this.citiesPost.findIndex(city=>city.LocalizedName === this.stateForm.value.search )
    console.log(this.stateForm.value.search);
  }
    
}
