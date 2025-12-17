import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportAnimalService {
  addAnimal() {
    const newAnimal = {
      id: '1',
      name: 'Lucky',
      species: 'Dog',
      age: 3,
      gender: 'Male',
      description: 'A friendly dog who loves playing fetch.',
      avatarUrl: 'https://example.com/images/lucky.jpg',
      adopted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newAnimal;
  }
}
