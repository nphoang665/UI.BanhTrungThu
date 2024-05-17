import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banh-trung-thu',
  templateUrl: './banh-trung-thu.component.html',
  styleUrl: './banh-trung-thu.component.css'
})
export class BanhTrungThuComponent implements OnInit {
  products = [
    {
      id:1,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    {
      id:2,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },{
      id:3,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    {
      id:4,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },{
      id:5,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    {
      id:6,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },{
      id:7,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    {
      id:8,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },{
      id:9,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    {id:10,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },{
      id:11,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    {
      id:12,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },{
      id:13,
      name: 'Bánh Trung Thu Truyền Thống',
      description: 'Bánh trung thu truyền thống với nhân đậu xanh và trứng muối.',
      price: 120000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    {
      id:14,
      name: 'Bánh Trung Thu Hiện Đại',
      description: 'Bánh trung thu với hương vị hiện đại, thích hợp cho giới trẻ.',
      price: 150000,
      image: 'https://www.banhngoncaocap.com/images/stories/virtuemart/product//resized/%C4%90%E1%BA%ADu%20Xanh%20Kh%C3%B4ng%20Tr%E1%BB%A9ng_250%20x350%20.png'
    },
    // Thêm các sản phẩm khác ở đây
  ];

  constructor() { }

  ngOnInit(): void {
  }
}