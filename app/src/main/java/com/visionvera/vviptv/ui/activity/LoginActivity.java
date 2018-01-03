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
package com.visionvera.vviptv.ui.activity;

import android.widget.EditText;
import android.widget.TextView;

import com.visionvera.vviptv.R;
import com.visionvera.vviptv.base.BaseActivity;
import com.visionvera.vviptv.bean.LoginInfo;
import com.visionvera.vviptv.component.AppComponent;
import com.visionvera.vviptv.component.DaggerMainComponent;
import com.visionvera.vviptv.ui.contract.LoginContract;
import com.visionvera.vviptv.ui.presenter.LoginPresenter;
import com.visionvera.vviptv.utils.ToastUtils;

import javax.inject.Inject;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 登录
 *
 * @author xux.
 * @date 17/12/27.
 */
public class LoginActivity extends BaseActivity implements LoginContract.View {

    @BindView(R.id.et_account)
    EditText etAccount;
    @BindView(R.id.et_password)
    EditText etPassword;
    @BindView(R.id.tv_login_btn)
    TextView tvLoginBtn;

    @Inject
    LoginPresenter mPresenter;

    @Override
    public int getLayoutId() {
        return R.layout.activity_login;
    }

    @Override
    protected void setupActivityComponent(AppComponent appComponent) {
        DaggerMainComponent.builder()
                .appComponent(appComponent)
                .build()
                .inject(this);
    }

    @Override
    public void initToolBar() {
//        mCommonToolbar.setNavigationIcon(R.drawable.ab_back);
//        mCommonToolbar.setTitle(R.string.book_detail);
    }

    @Override
    public void initDatas() {
//        bookId = getIntent().getStringExtra(INTENT_BOOK_ID);
//        EventBus.getDefault().register(this);
    }

    @Override
    public void configViews() {
        mPresenter.attachView(this);
    }

    @Override
    public void loginSuccess(LoginInfo loginInfo) {
        ToastUtils.showLongToast("登录成功");
    }

    @OnClick(R.id.tv_login_btn)
    public void onClickLogin() {
        String username = etAccount.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        mPresenter.login(username, password);
    }

    @Override
    public void showError() {

    }

    @Override
    public void complete() {

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mPresenter != null) {
            mPresenter.detachView();
        }
    }

}
