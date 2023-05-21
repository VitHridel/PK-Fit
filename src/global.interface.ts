import { ReactNode } from 'react'
import { ImageProps } from 'next/image'

export interface ChildrenInterface {
    children: ReactNode
}

export interface CourseInterface {
    image: ImageProps['src']
    headline: string
    place: string
    date: string
    text: string
    link: string
}

export interface ContactFormDataInterface {
    fullname: string,
    phone?: string,
    email: string,
    note: string,
    token?: string
}