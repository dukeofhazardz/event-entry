import React, { useState, useEffect } from 'react';
import { Texts } from '../infra/constants';
import { Event } from './Event';

export const App = () => (
  <div className='app-div'>
    <h1>{Texts.HOME_TITLE}</h1>
    <Event />
  </div>
  
);
