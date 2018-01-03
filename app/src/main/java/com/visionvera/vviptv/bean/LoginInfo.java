package com.visionvera.vviptv.bean;

/**
 * @author xux.
 * @date 17/12/27.
 */
public class LoginInfo {
    public String depName;// 病区/科室名称
    public long depId;// 科室/病区ID
    public String accountName;// 登录名

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }

    public long getDepId() {
        return depId;
    }

    public void setDepId(long depId) {
        this.depId = depId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }
}
