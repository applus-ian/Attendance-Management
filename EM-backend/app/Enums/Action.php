<?php

namespace App\Enums;

enum Action: string
{
    case Created = 'created';
    case Updated = 'updated';
    case Deleted = 'deleted';
}
