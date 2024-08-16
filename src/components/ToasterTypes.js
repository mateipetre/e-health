import React from 'react';
import HICToaster from './HICToaster';

export const ErrorToaster = (props) => <HICToaster {...props} type="error" />;
export const InfoToaster = (props) => <HICToaster {...props} type="info" />;
export const SuccessToaster = (props) => <HICToaster {...props} type="success" />;
export const WarningToaster = (props) => <HICToaster {...props} type="warning" />;