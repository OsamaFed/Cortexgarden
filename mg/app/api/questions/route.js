
import { NextResponse } from 'next/server';
import { getCachedQuestions } from '../../../lib/questionCache';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { categories, difficulty } = await request.json();
    
    if (!categories || !difficulty) {
      return NextResponse.json(
        { error: 'Missing categories or difficulty' },
        { status: 400 }
      );
    }

    const allQuestions = [];
    const questionsPerCategory = Math.ceil(11 / categories.length);

    for (const category of categories) {
      try {
        const questions = await getCachedQuestions(category.categoryId, difficulty, 11);
        
        if (questions.length === 0) {
          console.warn(`Skipping ${category.name} - no questions available`);
          continue;
        }
        
        const limitedQuestions = questions.slice(0, questionsPerCategory);

        const questionsWithCategory = limitedQuestions.map(q => ({
          ...q,
          categoryName: category.isRandom ? "Random Category" : category.name,
          categoryId: category.categoryId
        }));

        allQuestions.push(...questionsWithCategory);
      } catch (error) {
        console.error(`Error fetching questions for ${category.name}:`, error);
        continue;
      }
    }

    if (allQuestions.length === 0) {
      return NextResponse.json(
        { error: 'Something went wrong, please try again later' },
        { status: 500 }
      );
    }

    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const finalQuestions = shuffled.slice(0, 11);

    return NextResponse.json({ questions: finalQuestions });
  } catch (error) {
    console.error('Error in questions API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
