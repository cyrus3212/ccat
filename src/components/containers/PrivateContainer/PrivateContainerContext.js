import React from 'react';

const PrivateContainerContext = React.createContext({});

export const PrivateContainerProvider = PrivateContainerContext.Provider;
export const PrivateContainerConsumer = PrivateContainerContext.Consumer;
