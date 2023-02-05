import request from '@/utils/request'

// 查询用户列表
export function listUser(query) {
    return request({
        url: '/system/user/list',
        method: 'get',
        params: query
    })
}

export function addUser(data) {
    return request({
        url: '/system/user/add',
        method:  'put',
        data: data
    })
}

export function editUser(form) {
    return request({
        url: '/system/user/edit',
        method:  'put',
        data: form
    })
}

export function delUser(userId) {
    return request({
        url: '/system/user/del/',
        method:  'delete',
        data: userId
    })
}
