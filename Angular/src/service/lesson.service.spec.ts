import { TestBed } from '@angular/core/testing';

import { LessonsService } from './lesson.service';

describe('LessonService', () => {
  let service: LessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
