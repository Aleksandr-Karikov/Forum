import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { LoginForm } from './LoginForm';

export default {
    title: 'features/RegisterForm',
    component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.decorators = [StoreDecorator({
    loginForm: { username: '123', password: 'test' },
})];

export const withError = Template.bind({});
withError.decorators = [StoreDecorator({
    loginForm: { username: '123', password: 'test', error: 'ERROR' },
})];

export const withLoading = Template.bind({});
withLoading.decorators = [StoreDecorator({
    loginForm: { isLoading: true },
})];
