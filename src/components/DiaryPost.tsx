import { toast } from '@kimploo/react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../redux/function/url';

import calendar from '../assets/images/calendar.svg';
import { diary, diaryTag } from '../redux/types';
import { chipsColorPicker } from '../assets/customCSS/designSystem';

export default function DiaryPost({ params }: { params: string }) {
  const [post, setPost] = useState<diary>();

  const requestPost = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/diary/${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setPost(response.data.data);
    } catch (error) {
      toast('해당 일기를 불러오지 못했어요.');
    }
  };

  useEffect(() => {
    requestPost();
  }, []);

  return (
    <>
      <div className="flex gap-x-[11px] pb-4">
        <img src={calendar} alt="calendar_icon" />
        <p className="text-mono-700 text-2xl font-bold">{`${new Date(
          post?.modDate
        )
          .toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          .replaceAll('. ', '.')
          .slice(0, -1)} 의 감정`}</p>
      </div>
      <div className="flex gap-2">
        {post?.tags.map((item: diaryTag, index: number) => (
          <div
            key={index}
            className={chipsColorPicker(item.tag.tagCategorySeq)}
          >
            {item.tag.tagName}
          </div>
        ))}
      </div>
      <div className="text-mono-700 text-2xl font-bold py-4">{post?.title}</div>
      <div className="text-mono-700 text-base">{post?.contents}</div>
    </>
  );
}