import React, { FC, ReactNode } from 'react';
import s from './Notification.module.css'

type NotificationProps = {
    status: 'warning' | 'error'
    children: ReactNode
}

export const Notification: FC<NotificationProps> = ({ status, children }) => {
    return <div className={s.notification} data-status={status}>
        {children}
    </div>
}