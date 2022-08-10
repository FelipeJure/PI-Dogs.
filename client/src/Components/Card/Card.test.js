import { render, screen } from '@testing-library/react';
import Card from './Card';
import React from 'react';


test("render a Dog's name", () => {
    const dog = {
        name: 'Pug',
        id: 10,
        image: null,
        temperament: ['Rudo', 'Amigable'],
        life_span: '4 - 12 years',
        weight: '8 - 10',
        height: '5 - 8'
    }
    const component = render(<Card 
        name={dog.name} 
        id={dog.id}
        image={dog.image}
        temperament={
            dog.temperament
        }
        life_span={dog.life_span}
        weight={dog.weight}
        height={dog.height}
    />)
    console.log(component)
})