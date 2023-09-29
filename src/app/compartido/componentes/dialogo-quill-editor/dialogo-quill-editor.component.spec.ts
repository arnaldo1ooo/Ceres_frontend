import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoQuillEditorComponent } from './dialogo-quill-editor.component';

describe('QuillEditorComponent', () => {
  let component: DialogoQuillEditorComponent;
  let fixture: ComponentFixture<DialogoQuillEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoQuillEditorComponent]
    });
    fixture = TestBed.createComponent(DialogoQuillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
