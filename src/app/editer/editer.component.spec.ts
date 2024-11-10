import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerComponent } from './editer.component';

describe('EditerComponent', () => {
  let component: EditerComponent;
  let fixture: ComponentFixture<EditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
