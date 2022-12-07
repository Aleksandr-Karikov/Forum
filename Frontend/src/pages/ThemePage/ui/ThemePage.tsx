import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetThemeByIdQuery } from 'app/providers/StoreProvider/config/api';
import { PageLoader } from 'widgets/PageLoader';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSendMessageState } from 'features/SendMessage/model/selectors/getSendMesssageState/getSendMessageState';
import { sendMessageActions } from 'features/SendMessage/model/slice/SendMessageSlice';
import { sendMessage } from 'features/SendMessage/model/services/SendMessage/SendMessage';
import { fromStringNormalTime } from 'shared/lib/date/date';
import cls from './ThemePage.module.scss';

const ThemePage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const {
        data, isLoading, error, refetch,
    } = useGetThemeByIdQuery(+id);
    const { message, isLoading: isSending, error: sendingError } = useSelector(getSendMessageState);

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(sendMessageActions.setMessage(e.target.value));
    };

    const handleSend = () => {
        dispatch(sendMessage({ text: message, themeId: +id, refetch }));
    };

    return (
        <div className={cls.ThemePage}>
            {
                isLoading
                    ? <PageLoader />
                    : data.messages.map((mes) => (
                        <div>
                            {
                                `${fromStringNormalTime(mes.createdAt)} ${mes.author.username}: ${mes.text}`
                            }
                        </div>
                    ))
            }
            <TextField value={message} onChange={handleChange} />
            <Button disabled={isSending || !message} onClick={handleSend}>{t('Отправить')}</Button>
        </div>
    );
};

export default ThemePage;
