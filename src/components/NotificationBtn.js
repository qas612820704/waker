import React, { useCallback, useEffect } from 'react';
import { useMappedState, useDispatch } from '../reduplex';
import { MdNotifications, MdNotificationsNone } from 'react-icons/md';
import styled from '@emotion/styled';
import { toggleNotificationAvailability } from '../redux/actions';

export default function NotificationBtn() {
  const isEnable = useMappedState(
    useCallback(
      state => state.notifications.isEnable,
      [],
    ),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      toggleNotificationAvailability(
        Notification.permission
      )
    );
  }, []);

  const toggleNotification = useCallback(async () => {
    const permission = await Notification.requestPermission();
    dispatch(toggleNotificationAvailability(permission));
  });

  return (
    <Wrapper onClick={toggleNotification}>
    { isEnable
      ? <MdNotifications />
      : <MdNotificationsNone />
    }
    </Wrapper>
  );
}

const Wrapper = styled.span`
  cursor: pointer;
`;
