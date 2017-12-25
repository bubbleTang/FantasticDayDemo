//
//  BaseManager.m
//  FantasticDayDemo
//
//  Created by Huang on 2017/12/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "BaseManager.h"

@implementation BaseManager

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport {
  return
  @{
    @"isIphoneX": iPhoneX ? @"true" : @"false"
    };
}

@end
