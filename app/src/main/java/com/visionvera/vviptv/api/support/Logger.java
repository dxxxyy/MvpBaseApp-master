package com.visionvera.vviptv.api.support;

import com.visionvera.vviptv.utils.LogUtils;

/**
 * @author xux.
 * @date 2017/12/25.
 */
public class Logger implements LoggingInterceptor.Logger {

    @Override
    public void log(String message) {
        LogUtils.i("http : " + message);
    }
}
