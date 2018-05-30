import React from 'react';
import { storiesOf } from '@storybook/react';
import Register from '../components/Register';

storiesOf('Register', module)
  .add('nothing', () => (
    <Register />
  ))