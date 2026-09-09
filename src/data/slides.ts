import { SlideItem, WishItem } from '../types';

/**
 * 16 вертикальных фотографий: 01.jpg, 02.jpg ... 16.jpg.
 * Файлы можно положить как в public/photos/ (например public/photos/01.jpg),
 * так и прямо в корень папки public/ (public/01.jpg).
 */
export const PHOTO_NAMES = [
  '01.jpg', '02.jpg', '03.jpg', '04.jpg',
  '05.jpg', '06.jpg', '07.jpg', '08.jpg',
  '09.jpg', '10.jpg', '11.jpg', '12.jpg',
  '13.jpg', '14.jpg', '15.jpg', '16.jpg'
];

// Резервные вертикальные фотографии в теплой гамме (на случай пока пользователь не зальет файлы в public)
const FALLBACK_VERTICAL_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop", // коты / домашний уют
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop", // семья / родители
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop", // кино
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop"
];

export const DEFAULT_SLIDES: SlideItem[] = PHOTO_NAMES.map((name, index) => {
  return {
    id: index + 1,
    fileName: name,
    imageUrl: `/photos/${name}`,
    fallbackUrl: FALLBACK_VERTICAL_IMAGES[index % FALLBACK_VERTICAL_IMAGES.length]
  };
});

export function getSlides(): SlideItem[] {
  return DEFAULT_SLIDES;
}

export const CINEMA_WISHES: WishItem[] = [
  {
    id: 1,
    take: 1,
    scene: "ГЛАВНАЯ ПРЕМЬЕРА",
    quote: "«Пусть жизнь будет подобна оскароносному фильму: с восхитительным светом, глубоким смыслом и искренними чувствами в каждом кадре!»",
    body: "Дорогая Елена! Ты виртуозно управляешь сложнейшими процессами и создаешь истории, трогающие сердца. Желаем, чтобы твой личный жизненный сценарий изобиловал только счастливыми поворотами и преданными соавторами!",
    highlight: "Оглушительных премьер и признания!"
  },
  {
    id: 2,
    take: 2,
    scene: "ЗОЛОТОЙ ДУБЛЬ",
    quote: "«Идеальный свет, надежная команда и сценарии, от которых захватывает дух!»",
    body: "Пусть все бюджеты сходятся с легкостью, интуиция безошибочно подсказывает будущие шедевры, а творческая энергия бьет ключом каждый божий день. Твой продюсерский талант — редкий дар, меняющий мир вокруг!",
    highlight: "Гармонии и триумфальных проектов!"
  },
  {
    id: 3,
    take: 3,
    scene: "СЕМЕЙНАЯ ИСТОРИЯ",
    quote: "«Самый драгоценный киноархив — это моменты любви и уюта в кругу близких людей.»",
    body: "Желаем тебе крепкого здоровья, душевного спокойствия и бесконечного тепла дома. Пусть семейный архив пополняется самыми светлыми, радостными воспоминаниями, а родные всегда будут твоим главным вдохновением!",
    highlight: "Любви, тепла и безграничного счастья!"
  },
  {
    id: 4,
    take: 4,
    scene: "МОСКОВСКИЙ ВЕТЕР",
    quote: "«Москва рукоплещет твоему вкусу, харизме и неповторимой продюсерской грации!»",
    body: "Ты умеешь превращать идеи в захватывающее зрелище, объединяя сотни людей общей мечтой. Пусть каждый новый день приносит новые масштабы, вдохновляющие локации и яркие встречи!",
    highlight: "Новых высот и безграничных горизонтов!"
  },
  {
    id: 5,
    take: 5,
    scene: "АБСОЛЮТНЫЙ ШЕДЕВР",
    quote: "«С днем рождения, неповторимая Елена! Твоя жизнь — это кино высшей пробы.»",
    body: "Оставайся всегда такой же ослепительной, мудрой, женственной и целеустремленной. Пусть удача сопутствует каждому дублю, а аплодисменты не смолкают никогда!",
    highlight: "С днём рождения, Елена!"
  }
];
