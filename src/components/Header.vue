<template>
    <div class="page-header">
        <div class="header-left">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item
                    v-for="item in menuStore.breadcrumb"
                    :key="item.name"
                    :to="{ path: item.path }"
                >
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="header-right">
            <!-- <div class="color-change-box">
				<el-button class="btn" @click="changeBackground()">
					<img
						v-if="backgroundState == 'light'"
						src="@/assets/images/sun.png"
					/>
					<img v-else src="@/assets/images/moon.png" alt="" />
					<span>{{
						backgroundState == "light" ? "浅色模式" : "深色模式"
					}}</span>
				</el-button>
			</div> -->
            <div class="account-box">
                {{ adminStore.adminInfo.name }}({{ adminStore.adminInfo.role_info.name }})
            </div>

            <div class="message-box" @click="goMessage()">
                <span class="iconfont icon-message-notice"></span>
                <!-- <el-badge v-if="unReadNum > 0" :value="unReadNum" type="warning"
					style="margin-left: -10px; margin-top: -10px">
				</el-badge> -->
            </div>

            <div class="set-box">
                <el-dropdown>
                    <span class="iconfont icon-set"></span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="loginOut()">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useAdminStore from '@/store/admin';
const adminStore = useAdminStore();
adminStore.getInfo();

import useMenuStore from '@/store/set/menu';
const menuStore = useMenuStore();
menuStore.getBreadcrumb();


function loginOut(){
    adminStore.logout();
}
</script>

<style lang="scss" scoped>
.page-header {
    display: flex;
    align-items: center;
    height: 70px;
    line-height: 70px;
    padding: 10px;
    box-sizing: border-box;

    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 4px rgba(43, 45, 55, 0.01);

    .header-right {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;

        .color-change-box {
            width: 100px;
            height: 100%;

            .btn {
                width: 100%;
                height: 32px;
                line-height: 32px;
                border-radius: 16px;
                text-align: center;

                img {
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                }

                span {
                    font-size: 13px;
                }
            }
        }

        .account-box {
            margin-left: 20px;
            font-size: 14px;
        }

        .message-box {
            margin-left: 20px;

            .icon-message-notice {
                font-size: 22px;
            }
        }

        .set-box {
            margin-left: 20px;
            height: 100%;
            line-height: 100%;

            .icon-set {
                font-size: 22px;
            }
        }
    }
}
</style>
