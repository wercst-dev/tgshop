import { getAccounts, saveAccounts, addAccount, updateAccount, deleteAccount } from '@/lib/db';
import { NextResponse } from 'next/server';

// Проверка админской сессии (упрощенная версия)
function isAdminRequest(request) {
  // В реальном приложении здесь должна быть проверка JWT токена
  // Для демо используем заглушку - проверка в админке через localStorage
  return true;
}

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json(
      { error: 'Доступ запрещен' },
      { status: 403 }
    );
  }

  try {
    const accounts = await getAccounts();
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка загрузки данных' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (!isAdminRequest()) {
    return NextResponse.json(
      { error: 'Доступ запрещен' },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();
    const newAccount = await addAccount(data);
    return NextResponse.json(newAccount);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка добавления' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  if (!isAdminRequest()) {
    return NextResponse.json(
      { error: 'Доступ запрещен' },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();
    const { id, ...updates } = data;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID обязателен' },
        { status: 400 }
      );
    }

    const updated = await updateAccount(id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка обновления' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  if (!isAdminRequest()) {
    return NextResponse.json(
      { error: 'Доступ запрещен' },
      { status: 403 }
    );
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID обязателен' },
        { status: 400 }
      );
    }

    await deleteAccount(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка удаления' },
      { status: 500 }
    );
  }
}
