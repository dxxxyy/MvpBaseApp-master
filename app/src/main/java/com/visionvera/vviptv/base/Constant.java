/**
 * Copyright 2016 JustWayward Team
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.visionvera.vviptv.base;

import com.visionvera.vviptv.utils.AppUtils;
import com.visionvera.vviptv.utils.FileUtils;

/**
 * @author xux.
 * @date 17/12/25.
 */
public class Constant {

    public static final String API_BASE_URL = "http://172.16.110.104:28081/";

    public static final String API_VERSION = "1.0";

    public static final String REQUEST_SUCCESS = "8200";

    public static final String ISNIGHT = "isNight";

    public static String PATH_DATA = FileUtils.createRootPath(AppUtils.getAppContext()) + "/cache";

}
